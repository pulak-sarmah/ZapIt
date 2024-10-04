import { Database, Resource, getModelByName } from '@adminjs/prisma';
import { PrismaClient } from '@prisma/client';
import AdminJS from 'adminjs';
import { authenticate } from './authConfig.mjs';
import { sessionOptions } from './session.mjs';
import bcrypt from 'bcryptjs';
import { dark, light, noSidebar } from '@adminjs/themes';

export const prisma = new PrismaClient();
AdminJS.registerAdapter({ Database, Resource });

const adminOptions = {
  resources: [
    {
      resource: { model: getModelByName('Customer'), client: prisma },
      options: {
        listProperties: ['phone', 'role', 'isActive'],
        filterProperties: ['role', 'phone'],
      },
    },
    {
      resource: { model: getModelByName('LiveLocation'), client: prisma },
      options: {},
    },
    {
      resource: {
        model: getModelByName('BranchDeliveryPartner'),
        client: prisma,
      },
      options: {},
    },
    {
      resource: { model: getModelByName('DeliveryPartner'), client: prisma },
      options: {
        listProperties: ['email', 'role', 'isActive'],
        filterProperties: ['role', 'email'],
      },
    },
    {
      resource: { model: getModelByName('Admin'), client: prisma },
      options: {
        listProperties: ['email', 'role', 'isActive'],
        filterProperties: ['role', 'email'],
        properties: {
          password: {
            type: 'password',
          },
        },
        actions: {
          new: {
            before: async (request) => {
              const { password, email } = request.payload;

              if (password && password.length < 6) {
                throw new Error('Password must be at least 6 characters long');
              }

              const regex = /^[\w.@+-]+$/;

              if (!regex.test(password) || !regex.test(email)) {
                throw new Error('Password contains invalid characters');
              }
              if (password) {
                request.payload.password = await bcrypt.hash(password, 10);
              }

              return request;
            },
          },
          edit: {
            before: async (request) => {
              if (request.payload.password) {
                request.payload.password = await bcrypt.hash(
                  request.payload.password,
                  10
                );
              }
              return request;
            },
          },
        },
      },
    },
    {
      resource: { model: getModelByName('Branch'), client: prisma },
    },
  ],
  branding: {
    companyName: 'Zapit',
    favicon: '../assets/fav.ico',
    logo: '../assets/logo.webp',
  },
  defaultTheme: dark.id,
  availableThemes: [dark, light, noSidebar],
  rootPath: '/admin',
};

export const admin = new AdminJS(adminOptions);

export const buildAdminRouter = async (fastify) => {
  const { default: AdminJSFastify } = await import('@adminjs/fastify');

  await AdminJSFastify.buildAuthenticatedRouter(
    admin,
    {
      authenticate,
      // eslint-disable-next-line no-undef
      cookieName: process.env.COOKIE_PASSWORD,
      cookiePassword: 'secret-password',
    },
    fastify,
    sessionOptions
  );
};
