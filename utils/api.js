async function getRandomAvatar(seed) {
  const response = await fetch(
    `https://avatars.dicebear.com/api/avataaars/${seed}.svg?eyes[]=default&eyebrow[]=default&mouth[]=default`
  )

  return await response.blob()
}

export async function getUsers() {
  const response = await fetch('https://jsonplaceholder.typicode.com/users')
  const users = await response.json()

  for (let i = 0; i < users.length; i++) {
    const avatar = await getRandomAvatar(users[i].username)
    users[i].avatar = URL.createObjectURL(avatar)
  }

  return users
}
