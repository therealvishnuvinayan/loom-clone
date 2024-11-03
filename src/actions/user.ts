"use server";

import { currentUser } from "@clerk/nextjs/server";

export const onAuthenticateUser = async () => {
  try {
    const user = await currentUser();
    console.log('##user', user);
    if (!user) {
      return { status: 403 };
    }
    const userExists = await prisma?.user.findUnique({
      where: {
        clerkid: user.id,
      },
      include: {
        workspace: {
          where: {
            userId: user.id,
          },
        },
      },
    });
    if (userExists) {
      return { status: 200, user: userExists };
    }
    const newUser = await prisma?.user.create({
      data: {
        clerkid: user.id,
        email: user.emailAddresses[0].emailAddress,
        firstname: user.firstName,
        lastname: user.lastName,
        image: user.imageUrl,
        studio: {
          create: {},
        },
        subscription: {
          create: {},
        },
        workspace: {
          create: {
            name: `${user.firstName}'s Workspace`,
            type: "PERSONAL",
          },
        },
      },
      include: {
        workspace: {
          where: {
            userId: user.id,
          },
        },
        subscription: {
          select: {
            plan: true,
          },
        },
      },
    });
    if (newUser) {
      return { status: 201, user: newUser };
    } else {
      return { status: 400, user: null };
    }
  } catch (error) {
    console.error(error);
    return { status: 500 };
  }
};
