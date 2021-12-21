import prisma from '../../client';
import type { CreateInput, UpdateInput } from './types';

function create(data: CreateInput) {
  const { name } = data;

  return prisma.region.create({
    data: {
      name,
      country: {
        connect: {
          id: data.countryId,
        },
      },
    },
    include: { country: true },
  });
}

type UpdateArgs = { id: string; data: UpdateInput };

function update({ id, data }: UpdateArgs) {
  const { name } = data;

  return prisma.region.update({
    where: { id },
    data: {
      name,
      country:
        typeof data.countryId === 'string'
          ? {
              connect: {
                id: data.countryId,
              },
            }
          : undefined,
    },
    include: { country: true },
  });
}

function remove(id: string) {
  return prisma.region.delete({ where: { id } });
}

function getOne(id: string) {
  return prisma.region.findUnique({ where: { id } });
}

function getAll() {
  return prisma.region.findMany({ include: { country: true } });
}

function deleteAll() {
  return prisma.region.deleteMany();
}

export const regionsService = {
  create,
  update,
  remove,
  getOne,
  getAll,
  deleteAll,
};
