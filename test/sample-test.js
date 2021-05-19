const { assert } = require("chai");

describe("Contract", function() {
  let thing, proxy, v1Proxy;
  before(async () => {
    const Thing = await ethers.getContractFactory("Thing");
    thing = await Thing.deploy();
    await thing.deployed();

    const Proxy = await ethers.getContractFactory("Proxy");
    proxy = await Proxy.deploy(thing.address);
    await proxy.deployed();

    v1Proxy = await ethers.getContractAt("Thing", proxy.address);
  });

  it("should initially have num set at 100", async () => {
    assert.equal(await thing.num(), 100);
  });

  describe("change the num through the proxy", () => {
    before(async () => {
      await v1Proxy.action(42);
    });

    it("should update the num", async () => {
      assert.equal(await v1Proxy.num(), 42);
    });
  });

  describe("deploy a new thing and point the proxy at it", () => {
    let thing2, v2Proxy;
    before(async () => {
      const Thing2 = await ethers.getContractFactory("Thing2");
      thing2 = await Thing2.deploy();
      await thing2.deployed();

      // upgrading our protocol
      await proxy.changeAddress(thing2.address);

      v2Proxy = await ethers.getContractAt("Thing2", proxy.address);

      await v2Proxy.action2(10);
    });

    it("should update the num on thing2", async () => {
      assert.equal(await v2Proxy.num(), 3000);
    });
  });
});
