import { AxiosError } from "axios";

function errorHandler(error:AxiosError){
  if(error.response){
    // 요청이 이루어졌으며 서버가 2xx의 범위를 벗어나는 상태 코드로 응답
    console.log(error.response.data);
    console.log(error.response.status);
    console.log(error.response.headers);
  }
  else if (error.request) {
    // 요청이 이루어 졌으나 응답을 받지 못함
    console.log(error.request);
  }
  else {
    // 오류를 발생시킨 요청을 설정하는 중에 문제가 발생
    console.log('Error', error.message);
  }
  console.log(error.config);
}

export {errorHandler};