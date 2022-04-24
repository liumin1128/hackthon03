import axios from 'axios';
// import ReactCrop from 'react-image-crop'
import { ChangeEvent, useState } from 'react';
import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Crop from './Crop'

const uoload = async (file: string | Blob) => {
  const data = new FormData();
  data.append('file', file);
  const res = await axios({
    data,
    url: 'http://127.0.0.1:3101/upload',
    method: 'POST',
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return res;
};

const handleUpload = async (e: ChangeEvent<HTMLInputElement>) => {
  const files = Array.prototype.slice.call(e.target?.files);
  return await Promise.all(
    files.map(async (file) => {
      try {
        const { data } = await uoload(file);
        return data;
      } catch (err) {
        console.log("err")
        console.log(err)
        return {};
      }
    }),
  );
};

interface CropInfo {
  x: number
  y: number
  w: number
  h: number
}

interface Item {
  url: string
  crop_url: string
  crop_info: CropInfo
  detections_url: string
}

const download = (src: string) => {
  const a = document.createElement('a') // 创建一个a标签
  a.href = src // a标签的src属性赋值
  // a.download = name // a标签的download属性赋值
  document.body.appendChild(a) // 添加a标签到body下
  a.click() // 触发a标签点击事件
  document.body.removeChild(a) //  完成后删除a标签
}
export default function Home() {
  const [list,setList]= useState<Item[]>([])
  const handleClick = async (e: ChangeEvent<HTMLInputElement>) => {
    const data = await handleUpload(e);
    setList([...data,...list])
  };

  const handleClickBtn = () => {
    const input = document.createElement("input")
    input.setAttribute("type","file")
    input.addEventListener("change", (e) => {
      handleClick(e)
    })
    input.click()
  }

  const handleClickDownload = async () => {
    await Promise.all(
      list.map(i => {
        download(i.crop_url)
      })
    )
  }

  return (
    <div>
      {/*<input type="file" multiple onChange={handleClick} />*/}

      <Stack spacing={2} direction="row" >
      <Button size={"large"} color="primary" variant="contained" onClick={handleClickBtn} sx={{minWidth: 200,height:48,mb:4}}>Upload</Button>
      <Button size={"large"} color="primary" onClick={handleClickDownload} sx={{minWidth: 200,height:48,mb:4}}>Upload</Button>
      </Stack>

      <Stack spacing={3} divider={<Divider />}>
        {list.map(i => {
          return <Stack spacing={2} key={i.url} direction="row" >
            <Stack sx={{width: 300}}>
              <img style={{width:'100%'}} src={i.detections_url} alt="" />
            </Stack>
            <Stack sx={{width: 600}}>
              <Crop src={i.url} cropInfo={i.crop_info} />
            </Stack>
            {/*<Stack sx={{width: 200}}>*/}
            {/*  <img style={{width:'100%'}} src={i.crop_url} alt="" />*/}
            {/*</Stack>*/}
          </Stack>
        })}
      </Stack>

    </div>
  );
}
