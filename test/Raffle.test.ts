import { loadFixture, ethers, expect } from './setup.ts';

describe("Raffle auction", async function() {

    async function deploy() {
        const [user1, user2, user3, user4, user5] = await ethers.getSigners()

        const VRFMock = await ethers.getContractFactory("VRFCoordinatorV2_5Mock");
        const vrfMock = await VRFMock.deploy(0, 0, 0); 
        await vrfMock.waitForDeployment();
        
        const factory = await ethers.getContractFactory("Raffle")
        const contract = await factory.deploy("63281417366875788024294161379681594420089792472732677376218487019054372611132", vrfMock.getAddress())

        await contract.waitForDeployment()

        return {user1, user2, user3, user4, user5, contract, vrfMock}
    }

    it("should start auction", async function() {
        const {user1, user2, user3, user4, user5, contract, vrfMock} = await loadFixture(deploy)

        await expect(contract.connect(user1).participate()).to.be.revertedWithCustomError(contract, "NotEnoughMoneyToParticipate")

        const costOfAuction = ethers.parseEther("0.001");

        const first = await contract.connect(user1).participate({value: costOfAuction})

        expect(first).to.changeEtherBalance(user1, -costOfAuction)

        const second = await contract.connect(user2).participate({value: costOfAuction})

        expect(second).to.changeEtherBalance(user2, -costOfAuction)

        const third = await contract.connect(user3).participate({value: costOfAuction})

        expect(third).to.changeEtherBalance(user3, -costOfAuction)

        const fourth = await contract.connect(user4).participate({value: costOfAuction})

        expect(fourth).to.changeEtherBalance(user4, -costOfAuction)

        const fifth = await contract.connect(user5).participate({value: costOfAuction})

        expect(fifth).to.changeEtherBalance(user5, -costOfAuction)

        await expect(contract.connect(user5).participate({value: costOfAuction})).to.be.revertedWithCustomError(contract, "NotAvailableNow")

        await expect(fifth).to.emit(contract, "Result").withArgs;
    })
})

echo "# dz_10" >> README.md
git init
git add .
git commit -m "first commit"
git branch -M main
git remote add origin https://github.com/Verefrint/dz_10.git
git push -u origin main