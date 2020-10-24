import Role, { RoleModel } from '../model/Role';

export default class RoleRepository {
    public static getAllRoles(): Promise<Role[]> {
        return RoleModel.find().lean<Role>().exec();
    }
}
