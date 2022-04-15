"use strict";

const download = require("./download");

const smallImgUrl_20KB = "https://cdn-icons-png.flaticon.com/512/7298/7298218.png";
const smallImgUrl = "https://unsplash.com/photos/Suu8T18dtwk/download?ixid=MnwxMjA3fDB8MXxhbGx8OHx8fHx8fDJ8fDE2NDk5MDUyMTg&force=true";
const largeImgUrl = "https://effigis.com/wp-content/uploads/2015/02/Airbus_Pleiades_50cm_8bit_RGB_Yogyakarta.jpg";
const largeImgUrl_50MB = "https://effigis.com/wp-content/themes/effigis_2014/img/RapidEye_RapidEye_5m_RGB_Altotting_Germany_Agriculture_and_Forestry_2009MAY17_8bits_sub_r_2.jpg"
const randomImg = "https://source.unsplash.com/random"
const invalidUrl = "https://unsplash.com/";
const emptyStr = "";

describe("Downloader", () => {
  beforeAll(() => {
    console.log("beforeAll executes once before all tests");
    expect(download.cleanDir()).toMatch("Directory cleaning successfully");
  });

  describe("Normal Test", () => {
    it("should return \"Success\" when downloading a small img", async () => {
      const fileName = "img0.jpg";
      const fileUrl = smallImgUrl_20KB;
      await download.downloadFromUrl(fileUrl, fileName).then(data => { 
        expect(data).toBe("Success");
      });
    });

    it("should return \"Success\" when downloading a small img", async () => {
      const fileName = "img1.jpg";
      const fileUrl = smallImgUrl;
      await download.downloadFromUrl(fileUrl, fileName).then(data => { 
        expect(data).toBe("Success");
      });
    });

    it("should return \"Success\" when downloading a large img", async () => {
      const fileName = "img2.jpg";
      const fileUrl = largeImgUrl;
      await download.downloadFromUrl(fileUrl, fileName).then(data => { 
        expect(data).toBe("Success");
      });
    }, 50000); // Increase the timeout to 30 seconds for larger img

    it("should return \"Success\" when downloading a large img", async () => {
      const fileName = "img3.jpg";
      const fileUrl = largeImgUrl_50MB;
      await download.downloadFromUrl(fileUrl, fileName).then(data => { 
        expect(data).toBe("Success");
      });
    }, 50000); // Increase the timeout to 30 seconds for larger img

    it("should return \"Success\" when downloading a random img", async () => {
      const fileName = "img4.jpg";
      const fileUrl = randomImg;
      await download.downloadFromUrl(fileUrl, fileName).then(data => { 
        expect(data).toBe("Success");
      });
    }, 50000); // Increase the timeout to 30 seconds for larger img
  });

  describe("Error Test", () => {
    it("should return \"Invalid argument\" when the fileUrl is empty", async () => {
      const fileName = "img.jpg";
      const fileUrl = emptyStr;
      await expect(download.downloadFromUrl(fileUrl, fileName)).rejects.toMatch("Invalid argument");
    });

    it("should return \"Invalid argument\" when the fileName is empty", async () => {
      const fileName = emptyStr;
      const fileUrl = smallImgUrl;
      await expect(download.downloadFromUrl(fileUrl, fileName)).rejects.toMatch("Invalid argument");
    });

    it("should return \"Invalid argument\" when the fileUrl is undefined", async () => {
      const fileName = "img.jpg";
      const fileUrl = undefined;
      await expect(download.downloadFromUrl(fileUrl, fileName)).rejects.toMatch("Invalid argument");
    });

    it("should return \"Invalid argument\" when the fileName is undefined", async () => {
      const fileName = undefined;
      const fileUrl = smallImgUrl;
      await expect(download.downloadFromUrl(fileUrl, fileName)).rejects.toMatch("Invalid argument");
    });

    it("should return \"Error\" when the request url is not an image", async () => {
      const fileName = "img6.jpg";
      const fileUrl = invalidUrl;
      await expect(download.downloadFromUrl(fileUrl, fileName)).rejects.toMatch("Error");
    });
  });
});