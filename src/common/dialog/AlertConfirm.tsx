import React from 'react'
import alertConfirm, { Button, alert } from "react-alert-confirm";
import "react-alert-confirm/dist/index.css";


async function AlertConfirm({wishListDelete}:any){
    const [isOk, action, instance] = await alertConfirm({
      content: <div style={{ textAlign: 'center' }}>정말 찜 목록에서 제거하시겠어요?</div>,
      // eslint-disable-next-line react/no-unstable-nested-components
      footer(dispatch) {
        return (
          <div style={{margin:"auto"}}>
            <Button  style={{marginRight:"40px",width:"80px",borderRadius: "25px"}} onClick={() => dispatch('delete')} styleType="default">
              네
            </Button>
            <Button  style={{marginLeft:"40px",width:"80px",borderRadius: "25px"}} onClick={() => dispatch('cancel')} styleType="default">
              아니요
            </Button>
          </div>
        );
      },
      async closeBefore(action, close) {
        if (action === 'delete') {
          wishListDelete()
          close()
        } else {
          close()
        }
      },
    });
    console.log(isOk, action, instance);
  }

// function AlertConfirm() {
//   return (
//     <div>AlertConfirm</div>
//   )
// }

export default AlertConfirm