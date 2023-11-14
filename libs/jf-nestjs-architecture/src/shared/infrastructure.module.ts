import { DynamicModule, Module, OnApplicationBootstrap } from '@nestjs/common'
import { InfrastructureLoggerCreator } from './logger/InfraLoggerCreator'
import { LoggerCreator, CommandBus, QueryBus, Class } from 'jf-architecture'
import { ModulesContainer } from '@nestjs/core'
import { InstanceWrapper } from '@nestjs/core/injector/instance-wrapper'
import { InfrastructureConfiguration } from './InfrastructureConfiguration'

@Module({})
export class InfrastructureModule implements OnApplicationBootstrap {
  
  constructor(
    private readonly modulesContainer: ModulesContainer,
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  static forRoot(config: InfrastructureConfiguration): DynamicModule {
    return {
      global: true,
      module: InfrastructureModule,
      providers: [
        { provide: InfrastructureConfiguration, useValue: config },

        { provide: LoggerCreator, useClass: InfrastructureLoggerCreator },
    
        CommandBus,
        QueryBus
      ],
      exports: [LoggerCreator, CommandBus, QueryBus],
    }
  }

  onApplicationBootstrap() {
    const modules = Array.from(this.modulesContainer.values())

    modules
      .flatMap((module) => Array.from(module.providers.values()))
      .filter((instanceWrapper) => this.hasAObjectValue(instanceWrapper))
      .forEach((instanceWrapper) => this.registerHandler(instanceWrapper))
  }

  private hasAObjectValue(wrapper: InstanceWrapper): boolean {
    const constructor = wrapper.instance?.constructor

    return constructor ? true : false
  }

  private registerHandler(instanceWrapper: InstanceWrapper) {
    this.commandBus.registerIfHandler(instanceWrapper.instance as Class<any>)
    this.queryBus.registerIfHandler(instanceWrapper.instance as Class<any>)
  }
}
