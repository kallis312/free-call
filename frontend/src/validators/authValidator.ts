
import { string, ref, object } from 'yup';

const PASSWORD_REGEX = /^[a-zA-Z0-9]{8,}$/;

export const SignupSchema = object().shape({
  email: string().min(2, '短すぎる！').max(50, 'Too Long!').required('電子メールは必須フィールドです'),
  password: string().required('パスワードは必須フィールドです').matches(PASSWORD_REGEX, 'パスワードには 8 文字以上の文字と数字のみを含める必要があります'),
  confirm: string().required('確認は必須フィールドです').oneOf([ref('password'), ""], "確認パスワードがパスワードと一致しません")
})

export const LoginSchema = object().shape({
  email: string().min(2, '短すぎる！').max(50, 'Too Long!').required('電子メールは必須フィールドです'),
  password: string().required('パスワードは必須フィールドです').matches(PASSWORD_REGEX, 'パスワードには 8 文字以上の文字と数字のみを含める必要があります')
})