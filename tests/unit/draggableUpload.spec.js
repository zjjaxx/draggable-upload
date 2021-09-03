import { shallowMount, mount } from "@vue/test-utils";
import draggableUpload from "@/draggable-upload.vue";
const mockUrl =
  "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcar0.autoimg.cn%2Fupload%2F2013%2F2%2F18%2Fu_20130218165304639264.jpg&refer=http%3A%2F%2Fcar0.autoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633182777&t=c1a8a9db9b2e22afc51046858b781fce";
const fileList = [{ url: mockUrl, status: "success" }];
describe("draggableUpload.vue", () => {
  it("draggableUpload exit", () => {
    const wrapper = shallowMount(draggableUpload, {
      props: { fileList },
    });
    expect(wrapper.exists()).toBe(true);
  });
  it("fileList test", () => {
    const fileList = [
      { url: "", status: "loading" },
      { url: mockUrl, status: "success" },
      { url: "", status: "error" },
    ];
    const wrapper = mount(draggableUpload, {
      props: { fileList },
    });
    expect(wrapper.findAll(".img").length).toEqual(2);
    expect(wrapper.find(".icon-success").exists()).toBe(true);
    expect(wrapper.find(".icon-error").exists()).toBe(true);
    expect(wrapper.find(".loading-text").exists()).toBe(true);
  });
  it("limit test", () => {
    const wrapper = mount(draggableUpload, {
      props: { fileList, limit: 4 },
    });
    const mockData = {
      target: { files: ["file1", "file2", "file3", "file4", "file5", "file6"] },
    };
    wrapper.vm.handleChange(mockData);
    expect(wrapper.emitted().fileChange).toHaveLength(3);
  });
  it("preview test", () => {
    const wrapper = mount(draggableUpload, {
      props: { fileList, limit: 4 },
    });
    wrapper.find(".preview-icon").trigger("click");
    expect(wrapper.emitted().imgPreview[0][0].url).toEqual(mockUrl);
  });
  it("delete test", () => {
    const wrapper = mount(draggableUpload, {
      props: { fileList, limit: 4 },
    });
    wrapper.find(".icon-shanchu").trigger("click");
    expect(wrapper.emitted()).toHaveProperty("removeImg");
  });
});
