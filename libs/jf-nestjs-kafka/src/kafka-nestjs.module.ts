import { DynamicModule, Global, Module, OnModuleDestroy, OnModuleInit } from '@nestjs/common'
import { KafkaClient } from './shared/client/KafkaClient'
import { KafkaJsonConverter } from './shared/converters/KafkaJsonConverter'
import { KafkaConverter } from './shared/converters/KafkaConverter'
import { KafkaConfiguration } from './KafkaConfiguration'
import { ModulesContainer } from '@nestjs/core'
import { BaseKafkaConsumer } from './shared/consumers/BaseKafkaConsumer'

@Global()
@Module({})
export class KafkaNestjsModule implements OnModuleInit, OnModuleDestroy {

    constructor(
        private readonly kafkaClient: KafkaClient,
        private readonly modulesContainer: ModulesContainer,
    ) { }

    static forRoot(config: KafkaConfiguration): DynamicModule {
        return {
            module: KafkaNestjsModule,
            providers: [
                { provide: KafkaConfiguration, useValue: config },
                { provide: KafkaConverter, useClass: KafkaJsonConverter },

                KafkaClient,
            ],
            exports: [
                KafkaClient
            ]
        }
    }

    async onModuleInit() {
        const modules = Array.from(this.modulesContainer.values())

        modules
            .flatMap((module) => Array.from(module.providers.values()))
            .map((InstanceWrapper) => InstanceWrapper.instance)
            .filter((instance) => instance instanceof BaseKafkaConsumer)
            .map((instance) => instance as BaseKafkaConsumer)
            .forEach((kafkaConsumer) => this.kafkaClient.registryConsumer(kafkaConsumer))


        await this.kafkaClient.connect()
    }

    async onModuleDestroy() {
        await this.kafkaClient.disconnect()
    }
}