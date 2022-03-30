import { Test, TestingModule } from '@nestjs/testing';
import { CreateUser } from './dto/create-user.dto';
import { UpdateUser } from './dto/update-user.dto';
import { UserEntity } from './entity/user.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

const userList: UserEntity[] = [
  new UserEntity({ id: '1', name: 'user-1', email: 'user1@gmail.com' }),
  new UserEntity({ id: '2', name: 'user-2', email: 'user2@gmail.com' }),
  new UserEntity({ id: '3', name: 'user-3', email: 'user3@gmail.com' }),
];

const newUserEntity = new UserEntity({
  name: 'chiquinho',
  email: 'email@chiquinho.com',
});

const updatedUser = new UserEntity({
  id: '1',
  name: 'updated-user-1',
  email: 'user1@gmail.com',
});

describe('UserController', () => {
  let userController: UserController;
  let userService: UserService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserController],
      providers: [
        {
          provide: UserService,
          useValue: {
            findAll: jest.fn().mockResolvedValue(userList),
            findOne: jest.fn().mockResolvedValue(userList[0]),
            create: jest.fn().mockResolvedValue(newUserEntity),
            update: jest.fn().mockResolvedValue(updatedUser),
            deleteById: jest.fn().mockResolvedValue(undefined),
          },
        },
      ],
    }).compile();

    userController = module.get<UserController>(UserController);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(userController).toBeDefined();
    expect(userService).toBeDefined();
  });

  describe('index', () => {
    it('should return an user list entity succesfully', async () => {
      //Act
      const result = await userController.index();

      //Assert
      expect(result).toEqual(userList);
      expect(typeof result).toEqual('object');
      expect(userService.findAll).toHaveBeenCalledTimes(1);
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(userService, 'findAll').mockRejectedValueOnce(new Error());

      //Act
      expect(userController.index()).rejects.toThrowError();
    });
  });

  describe('create', () => {
    it('should create an user entity succesfully', async () => {
      //Arrange
      const body: CreateUser = {
        nome: 'chiquinho',
        email: 'email@chiquinho.com',
      };

      //Act
      const result = await userController.create(body);

      //Assert
      expect(result).toEqual(newUserEntity);
      expect(userService.create).toHaveBeenCalledWith(body);
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(userService, 'create').mockRejectedValueOnce(new Error());
      const body: CreateUser = {
        nome: 'chiquinho',
        email: 'email@chiquinho.com',
      };

      //Act
      expect(userController.create(body)).rejects.toThrowError();
    });
  });

  describe('show', () => {
    it('should get an user succesfully', async () => {
      //Arrange
      const result = await userController.show('1');

      //Act
      expect(result).toEqual(userList[0]);
      expect(userService.findOne).toHaveBeenCalledTimes(1);
      expect(userService.findOne).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(userService, 'findOne').mockRejectedValueOnce(new Error());

      //Act
      expect(userController.show('1')).rejects.toThrowError();
    });
  });

  describe('update', () => {
    it('should update an user succesfully', async () => {
      //Arrange
      const body: UpdateUser = {
        nome: 'updated-user-1',
        email: 'user1@gmail.com',
      };

      //Act
      const result = await userController.update('1', body);

      //Assert
      expect(result).toEqual(updatedUser);
      expect(userService.update).toHaveBeenCalledTimes(1);
      expect(userService.update).toHaveBeenLastCalledWith('1', body);
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(userService, 'update').mockRejectedValueOnce(new Error());
      const body: UpdateUser = {
        nome: 'updated-user-1',
        email: 'user1@gmail.com',
      };

      //Act
      expect(userController.update('1', body)).rejects.toThrowError();
    });
  });

  describe('delete', () => {
    it('should delete an user succesfully', async () => {
      //Act
      const result = await userController.delete('1')

      //Assert
      expect(result).toBeUndefined();
      expect(userService.deleteById).toHaveBeenCalledTimes(1)
      expect(userService.deleteById).toHaveBeenCalledWith('1');
    });

    it('should throw an exception', () => {
      //Arrange
      jest.spyOn(userService, 'deleteById').mockRejectedValueOnce(new Error());
  
      //Act
      expect(userController.delete('1')).rejects.toThrowError();
    });
  });
});
