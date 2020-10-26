import Role, { RoleModel } from '../model/Role';

export default class RoleRepository {
    public static getAllRoles(): Promise<Role[]> {
        return RoleModel.find().lean<Role>().exec();
    }

    public static findByCode(roleCode: string): Promise<Role | null> {
        return RoleModel.findOne({ roleCode: roleCode }).lean<Role>().exec();
    }
}
