import { Injectable } from '@nestjs/common';
import { CounterRepo } from './repos/counter.repo';
import { CounterNames } from './interfaces/counter.interface';
@Injectable()
export class CounterService {
	constructor(private readonly _counterRepo: CounterRepo) {}

	async increase(counterName: CounterNames) {
		const counter = await this._counterRepo.findByIdAndUpdate(counterName, { $inc: { seq: 1 } } as any, {
			new: true,
			upsert: true
		});
		return counter.seq;
	}
}
