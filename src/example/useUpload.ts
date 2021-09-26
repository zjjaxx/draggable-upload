interface FileItem {
    status: "loading" | "success" | "error";
    url: string;
    [propName: string]: unknown;
}
interface File {
    name: string;
    type: string;
    [propName: string]: unknown;
}
import { reactive, defineComponent } from "vue";
const mockUrl =
    "https://gimg2.baidu.com/image_search/src=http%3A%2F%2Fcar0.autoimg.cn%2Fupload%2F2013%2F2%2F18%2Fu_20130218165304639264.jpg&refer=http%3A%2F%2Fcar0.autoimg.cn&app=2002&size=f9999,10000&q=a80&n=0&g=0n&fmt=jpeg?sec=1633182777&t=c1a8a9db9b2e22afc51046858b781fce";
export default function useUpload() {
    const fileList = reactive([
        {
            status: "success",
            url: mockUrl,
        },
    ]);
    const handleFileChange = (file: File, fileList: FileItem[]) => {
        console.log("file fileList is", file, fileList);
        const index = fileList.length;
        fileList.push({
            url: "",
            status: "loading",
        });
        setTimeout(() => {
            if (index % 2 == 0) {
                fileList[index].url = "";
                fileList[index].status = "error";
            } else {
                fileList[index].url = mockUrl + Math.random();
                fileList[index].status = "success";
            }
        }, 1000);
    };
    const handleRemoveImg = (
        index: number,
        item: FileItem,
        fileList: FileItem[]
    ) => {
        fileList.splice(index, 1);
    };
    const handleImgPreview = (item: FileItem) => {
        console.log("preview", item.url);
    };
    return {
        fileList,
        handleFileChange,
        handleRemoveImg,
        handleImgPreview
    }
}