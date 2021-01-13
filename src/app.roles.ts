import { RolesBuilder } from 'nest-access-control';

enum AppRoleActions {
	READ = 'read',
	CREATE = 'create',
	UPDATE = 'update',
	DELETE = 'delete'
}

enum AppRolePossessions {
	ANY = 'any',
	OWN = 'own'
}

export enum AppRoles {
	USER = 'USER',
	ADMIN = 'ADMIN',
	SUPER_ADMIN = 'SUPER_ADMIN'
}

enum AppResources {
	CREATE_ADMIN = 'CREATE_ADMIN',
	CLIENT = 'CLIENT',
	ORDER = 'ORDER',
	USER = 'USER'
}

export const AccessControl = {
	Actions: AppRoleActions,
	Possessions: AppRolePossessions,
	Roles: AppRoles,
	Resources: AppResources
};

export const roles: RolesBuilder = new RolesBuilder();

roles
	// User
	.grant(AccessControl.Roles.USER)
	.read(AccessControl.Resources.USER)

	// Admin
	.grant(AccessControl.Roles.ADMIN)
	.extend(AccessControl.Roles.USER)

	.read(AccessControl.Resources.CLIENT)
	.create(AccessControl.Resources.CLIENT)
	.update(AccessControl.Resources.CLIENT)
	.delete(AccessControl.Resources.CLIENT)

	.read(AccessControl.Resources.ORDER)
	.create(AccessControl.Resources.ORDER)
	.update(AccessControl.Resources.ORDER)
	.delete(AccessControl.Resources.ORDER)

	//Super Admin
	.grant(AccessControl.Roles.SUPER_ADMIN)
	.extend(AccessControl.Roles.ADMIN)
	.extend(AccessControl.Roles.USER)
	.create(AccessControl.Resources.CREATE_ADMIN)


