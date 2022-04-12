const paths = require('../../utils/paths');
const EquipmentModel = require(paths.models.equipment);
const { isEmptyArray } = require('../../utils/shorts');


const _saveChanges = async (model) => {
    return await model.save()
        .catch(() => {
            throw 'cannot save changes'
        });
}

module.exports = {

    getEquipmentBy: async function (field) {
        const equipment = await EquipmentModel.findOne({ where: field });
        return isEmptyArray(equipment, 'equipment not found');
    },

    getAll: async function () {
        const all = await EquipmentModel.findAll();
        return isEmptyArray(all, 'cannot find any equipment into the database');
    },

    create: async function (equipment) {
        return await EquipmentModel.create(equipment)
            .then(equipment => {
                return equipment.id;
            })
            .catch(err => {
                throw 'cannot create new equipment';
            });
    },

    remove: async function (id) {
        const equipment = await EquipmentModel.findOne({
            where: { id: id }
        });

        if (!equipment) {
            throw 'equipment does not exist'
        }
        return await equipment.destroy();
    },

    updateImage: async function (equipment) {
        return await EquipmentModel.findOne({
            where: { id: equipment.id }
        }).then(async oldEquipment => {
            oldEquipment.image = equipment.image;

            return await _saveChanges(oldEquipment);

        })
    },

    updateLocation: async function (equipment) {
        return await EquipmentModel.findOne({
            where: { id: equipment.id }
        }).then(async oldEquipment => {
            oldEquipment.current_location = equipment.current_location;

            return await _saveChanges(oldEquipment);
        })
    },

    updateStatus: async function (equipment) {
        return await EquipmentModel.findOne({
            where: { id: equipment.id }
        }).then(async oldEquipment => {
            oldEquipment.status = equipment.status;
            return await _saveChanges(oldEquipment);
        })
    }
}