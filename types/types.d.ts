export type TPostsCategory = {
  title: string;
  route: string;
};

export type TRegisterForm = {
  username: string;
  email: string;
  password: string;
  confirm_password: string;
  gender: string;
};

export type TLoginForm = {
  email: string;
  password: string;
};

//{ username: name, _id, email, profile_photo }

export type AuthUser = {
  username: string;
  _id: string | any;
  email: string;
  profile_photo: string;
};
