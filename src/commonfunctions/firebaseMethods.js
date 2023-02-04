import database from '@react-native-firebase/database';
import firebase from '@react-native-firebase/app'



export const doLogin= async (email,password)=>{

    var data = {}

    const databaseURL = firebase.app().options.databaseURL;
console.log(databaseURL);


    await database().ref('usersList').once("value",snapshot=>{
        let userList = snapshot.val()
        console.log("----> ",userList)
        const result = userList.find((user)=> user.email_id === email)
        if(result === undefined){
            data['status']=false;
            data['message']='please enter the valid email id';
        }else{
          if(result.password === password){
            data=result
            data['status']=true;
          }else{
            data['status']=false;
            data['message']='please enter the valid password';
          }
        }
      })

      return data
}


export const createHouse= async (houseDetails,userId)=>{
  
  var data = {}
  await database().ref('/houseList/'+userId).push()
            .set(
              houseDetails
            )
            .then(() => {
              console.log("done ==========>")
              data['status']=true;
            })
            .catch((e)=>{
              data['status']=false;
              data['message']='somethingwent wrong please tryagain';
            })
    return data
}

export const updateHouse= async (houseDetails,userId)=>{
  var data = {}
  console.log("done ==update========>",houseDetails.status)

  await database().ref('/houseList/'+userId+"/"+houseDetails.key)
            .update(
              houseDetails
            )
            .then(() => {
              console.log("done ==update========>")
              data['status']=true;
            })
            .catch((e)=>{
              console.log("done ==update e========>",e)

              data['status']=false;
              data['message']='somethingwent wrong please tryagain';
            })
    return data
}


export const getHouseList= async (userId)=>{
  var data = {}
  await database().ref('houseList/'+userId).once("value",snapshot=>{
    let houseList = snapshot.val()
    var list = []
    if(houseList){
      Object.keys(houseList).forEach(key=>{
        let l = houseList[key]
        l["key"] = key
        list.push(l)
      })
    }

    data['status']=true;
    data['data']=list;
  })

    return data
}




export const createTenant= async (tenantDetails,userId)=>{
  
  var data = {}
  await database().ref('/tenantList/'+userId).push()
            .set(
              tenantDetails
            )
            .then(() => {
              data['status']=true;
            })
            .catch((e)=>{
              data['status']=false;
              data['message']='somethingwent wrong please tryagain';
            })
    return data
}

export const getTenantList= async (userId)=>{
  var data = {}
  await database().ref('tenantList/'+userId).once("value",snapshot=>{
    let tenantList = snapshot.val()
    var list = []
    if(tenantList){
      Object.keys(tenantList).forEach(key=>{
        let l = tenantList[key]
        l["key"] = key
        list.push(l)
      })
    }

    data['status']=true;
    data['data']=list;
  })

    return data
}

export const updateTenant= async (tenantDetails,userId)=>{
var data = {}
await database().ref('/tenantList/'+userId+"/"+tenantDetails.key)
          .update(
            tenantDetails
          )
          .then(() => {
            data['status']=true;
            data['message']='Tenant Updated successfully';

          })
          .catch((e)=>{
            data['status']=false;
            data['message']='somethingwent wrong please tryagain';
          })
  return data
}


export const createPayment= async (paymentDetails,userId)=>{
  
  var data = {}
  await database().ref('/paymentList/'+userId).push()
            .set(
              paymentDetails
            )
            .then(() => {
              data['status']=true;
              data['message']='Paid successfully';
            })
            .catch((e)=>{
              data['status']=false;
              data['message']='somethingwent wrong please tryagain';
            })
    return data
}

export const createSettlement= async (settlementList,userId)=>{
  
  var data = {}
  await database().ref('/settlementList/'+userId).push()
            .set(
              settlementList
            )
            .then(() => {
              data['status']=true;
              data['message']='Paid successfully';
            })
            .catch((e)=>{
              data['status']=false;
              data['message']='somethingwent wrong please tryagain';
            })
    return data
}
