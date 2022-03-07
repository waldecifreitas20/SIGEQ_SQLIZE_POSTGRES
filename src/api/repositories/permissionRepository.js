const { models } = require('../../utils/paths');
const PermissionModel = require(models.permission);
const UserModel = require(models.user);
module.exports = {
    createPermision : async permission => {
        try {
            return await PermissionModel.create(permission);
        } catch (error) {
            console.log(error);
            throw 'Create permission attempt failed';
        }
    },
    setLinkBetween : async (user, permission) => {
        try {
            await user.addPermission(permission);
            return UserModel.findOne({ id : user.id, include : PermissionModel});
        } catch (error) {
            console.log(error);
            throw 'To set link attempt has been failed';
        }
    }
}