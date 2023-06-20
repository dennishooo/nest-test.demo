import { Test, TestingModule } from '@nestjs/testing';
import { AppController } from './app.controller';
import { AppService } from './app.service';

describe('AppController', () => {
  let appController: AppController;
  let appService: AppService;

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      controllers: [AppController],
      providers: [AppService],
    }).compile();

    // TestingModule inherits from the module reference class,
    // and therefore its ability to dynamically resolve scoped providers (transient or request-scoped).
    // Do this with the resolve() method (the get() method can only retrieve static instances).
    appService = moduleRef.get<AppService>(AppService);
    appController = moduleRef.get<AppController>(AppController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });

  describe('findAll', () => {
    it(`should return {name: 'lfx digital'}`, () => {
      const result = [{ name: 'lfx digital' }];
      jest.spyOn(appService, 'getAll').mockImplementation(() => result);
      expect(appController.getAll()).toEqual(result);
    });
  });
});
