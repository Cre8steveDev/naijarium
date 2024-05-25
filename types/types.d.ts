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
