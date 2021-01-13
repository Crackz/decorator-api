export type CheckExistsOpts = {
	param?: string;
	lean?: boolean;
};

export interface IBaseService {
	checkExist<T>(id: string, opts?: CheckExistsOpts): Promise<T>;
}
