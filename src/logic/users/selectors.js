export const getFocusedUser = (state) => {
  const uid = state.containers.router.parameters.params.uid;
  if (uid) {
    if (uid == 'me') {
      let meUser = { ...state.session.user };
      meUser.id = meUser._id;
      return meUser;
    } else {
      return state.containers.users.item && state.containers.users.item;
    }
  }
  return null;
};

export const userBelongsToMe = (state) => {
  const myUser = state.session.user;
  const resetUser = state.containers.users.item;
  if (!myUser || !resetUser) { return false; }
  switch (myUser.role) {
    case 'superAdmin':
      return true;
    case 'organizationAdmin':
      return myUser.organization.id == resetUser.organization.id;
    case 'vendorAdmin':
      return myUser.vendor.id == resetUser.vendor.id;
    case 'vendor':
      return false;
  }
};
