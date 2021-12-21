import prisma from '../../client';
import type { CreateInput, UpdateInput } from './types';

function create(data: CreateInput) {
  return prisma.country.create({
    data,
  });
}

type UpdateArgs = { id: string; data: UpdateInput };

function update({ id, data }: UpdateArgs) {
  return prisma.country.update({
    where: {
      id,
    },
    data,
  });
}

function remove(id: string) {
  return prisma.country.delete({ where: { id } });
}

function getOne(id: string) {
  return prisma.country.findUnique({ where: { id } });
}

function getAll() {
  return prisma.country.findMany();
}

function deleteAll() {
  return prisma.country.deleteMany();
}

export const countriesService = {
  create,
  update,
  remove,
  getOne,
  getAll,
  deleteAll,
};
