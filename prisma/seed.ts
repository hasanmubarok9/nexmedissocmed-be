import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  const user1 = await prisma.user.upsert({
    where: { email: 'hasan.mubarok@gmail.com' },
    update: {},
    create: {
      email: 'hasan.mubarok@gmail.com',
      name: 'Hasan Mubarok',
      password: 'password',
    },
  });

  const user2 = await prisma.user.upsert({
    where: { email: 'john.doe@gmail.com' },
    update: {},
    create: {
      email: 'john.doe@gmail.com',
      name: 'John Doe',
      password: 'password',
    },
  });

  const post1 = await prisma.post.upsert({
    where: { id: 1 },
    update: {},
    create: {
      content: 'Hallo, this is my first post',
      imageUrl: 'https://picsum.photos/200/300',
      userId: user1.id,
    },
  });

  const post2 = await prisma.post.upsert({
    where: { id: 2 },
    update: {},
    create: {
      content: 'What a beautiful day!',
      imageUrl: 'https://picsum.photos/200/300',
      userId: user2.id,
    },
  });

  const comment1 = await prisma.comment.upsert({
    where: { id: 1 },
    update: {},
    create: {
      content: 'Hope you have a great day!',
      postId: post1.id,
      userId: user2.id,
    },
  });

  const comment2 = await prisma.comment.upsert({
    where: { id: 2 },
    update: {},
    create: {
      content: 'Cool!',
      postId: post2.id,
      userId: user1.id,
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
