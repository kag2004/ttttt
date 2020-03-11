document.addEventListener('DOMContentLoaded', function() {
    let inputid = document.getElementById('inputid')
    let inputpw = document.getElementById('inputpw')
    let addBtn = document.getElementById('addBtn')
    let delBtn = document.getElementById('delBtn')
    let searchBtn = document.getElementById('searchBtn')
    let LoginBtn = document.getElementById('LoginBtn')
    let selectIsAll = document.getElementById('selectIsAll')
    let inputTarget = document.getElementById('inputTarget')
    let memberDiv = document.getElementById('memberList')
   
    let reqNo = 1; 
   
    signalSocketIo.on('knowledgetalk', function(data) {
   
      console.log('receive', data);
   
      if (!data.eventOp && !data.signalOp) {
        console.log('error', 'eventOp undefind');
      }
   
      if (data.eventOp === 'Login') {
        LoginBtn.disabled = true;
        searchBtn.disabled = false;
        addBtn.disabled = false;
        delBtn.disabled = false;
        memberList();
      }
      if (data.eventOp === 'Contact') {
        memberList();
      }

      if (data.eventOp === 'MemberList') {
        console.log(data.result.friend);
        // memberDiv.innerText = '참여자 : ' + data.result.friend[0].id + '';
        let tt = data.result.friend;
        memberDiv.style = 'margin-top : 20px';

        memberDiv.innerText = ' 내 친구 목록 : ';
        for(var i=0; i<tt.length; i++){
          memberDiv.innerText += ` 유저 아이디 : ${data.result.friend[i].id}  
              유저 name : (${data.result.friend[i].name})  
              name_number  :   (${data.result.friend[i].user_number}) 
              device_type  :    (${data.result.friend[i].device_type})
              user_state   :    (${data.result.friend[i].user_state})
              -----------------------------------------
              ` 
        }
        //${i >= tt.length - 1 ? '' : ','
      }
    });
   
    LoginBtn.addEventListener('click', function(e) {
      let loginData = {
        eventOp: 'Login',
        reqNo: 1,
        userId: inputid.value,
        userPw: passwordSHA256(inputpw.value),
        reqDate: 20171011133100123,
        deviceType: 'pc'
      };
      try {
        console.log('send', loginData);
        signalSocketIo.emit('knowledgetalk', loginData);
      } catch (err) {
        if (err instanceof SyntaxError) {
          alert('there was a syntaxError it and try again :' + err.message);
        } else {
          throw err;
        }
      }
    });
   
    function memberList() {
      let limit = 10;
      let offset = 0;
      let objOp = {
        limit,
        offset
      };
   
      let memberList = {
        eventOp: 'MemberList',
        reqNo: reqNo++,
        reqDate: 20171011133100123,
        type: selectIsAll.value,
        option: objOp
      };
      try {
        console.log('send', memberList);
        signalSocketIo.emit('knowledgetalk', memberList);
      } catch (err) {
        if (err instanceof SyntaxError) {
          alert(' there was a syntaxError it and try again : ' + err.message);
        } else {
          throw err;
        }
      }
    }
    //친구 추가 버튼
    addBtn.addEventListener('click', function(e) {
      let addFriend = {
        eventOp: 'Contact',
        reqNo: reqNo++,
        reqDate: 20171011133100123,
        type: 'add',
        target: inputTarget.value
      };
      try {
        console.log('send', addFriend);
        signalSocketIo.emit('knowledgetalk', addFriend);
      } catch (err) {
        if (err instanceof SyntaxError) {
          alert('there was a syntaxError it and try again :' + err.message);
        } else {
          throw err;
        }
      }
    });

    //검색 버튼
    searchBtn.addEventListener('click', function(e) {
      let addFriend = {
        eventOp: 'Contact',
        reqNo: reqNo++,
        reqDate: 20171011133100123,
        type: 'common',
        search: ''
        
        
        
      };
      try {
        console.log('send', addFriend);
        signalSocketIo.emit('knowledgetalk', addFriend);
      } catch (err) {
        if (err instanceof SyntaxError) {
          alert('there was a syntaxError it and try again :' + err.message);
        } else {
          throw err;
        }
      }
    });
   
    //친구 삭제 버튼
    delBtn.addEventListener('click', function(e) {
      let addFriend = {
        eventOp: 'Contact',
        reqNo: reqNo++,
        reqDate: 20171011133100123,
        type: 'delete',
        target: inputTarget.value
      };
      try {
        console.log('send', JSON.stringify(addFriend));
        signalSocketIo.emit('knowledgetalk', addFriend);
      } catch (err) {
        if (err instanceof SyntaxError) {
          alert('there was a syntaxError it and try again :' + err.message);
        } else {
          throw err;
        }
      }
    });
  });