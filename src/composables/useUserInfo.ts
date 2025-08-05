export interface UserInfo {
  id: number
  email: string
  zh_name: string
  en_name: string
  mobile: string
  role_name: string
  token: string
}

export function useUserInfo() {
  const store = useUserInfoStore()

  // 初始化用户信息
  store.initUserInfo()

  return {
    // 状态（只读）
    zhName: computed(() => store.zh_name),
    enName: computed(() => store.en_name),
    mobile: computed(() => store.mobile),
    email: computed(() => store.email),
    roleName: computed(() => store.role_name),
    token: computed(() => store.token),
  }
}
