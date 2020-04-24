var gUsers = _getUsers()

function _getUsers() {
  let users = JSON.parse(localStorage.getItem("users"));
  if (!users || !users.length) {
    users = [];
    localStorage.setItem('users', JSON.stringify(users))
  }
  return users
}

function getUser() {
  return new Promise((resolve, reject) => {
    if(!gUsers || !gUsers.length) reject ('No Users are siggned up')
    const user = gUsers.find((user) => user);  
    user ? resolve(JSON.parse(JSON.stringify(user))) : reject("No user was found");
  });
}

function signup(user) {
  return new Promise((resolve, reject) => {
    user.coins = 100;
    user.moves = [];
    user._id = _makeId();
    gUsers.unshift(user)
    localStorage.setItem('users', JSON.stringify(gUsers))
    resolve(user);
  });
}

async function addMove(move) {
  const user = await getUser()
  user.coins = user.coins - move.amount;
  user.moves.unshift(move);

  const userIdx = gUsers.findIndex(u => u._id === user._id)
  if(userIdx !== -1){
    gUsers.splice(userIdx, 1, user)
    localStorage.setItem('users', JSON.stringify(gUsers))
  }
  return user
}

export default {
  getUser,
  signup,
  addMove
};

function _makeId(length = 10) {
  var txt = "";
  var possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  for (var i = 0; i < length; i++) {
    txt += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return txt;
}
