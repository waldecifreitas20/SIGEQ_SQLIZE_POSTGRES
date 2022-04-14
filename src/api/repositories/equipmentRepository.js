const paths = require('../../utils/paths');
const EquipmentModel = require(paths.models.equipment);
const { isEmptyArray, throwException, isEmptyObject } = require('../../utils/shorts');


const _saveChanges = async (model) => {
    return await model.save()
        .catch(() => {
            return throwException('cannot save changes', 502);
        });
}

module.exports = {

    getEquipmentBy: async function (field) {
        const equipment = await EquipmentModel.findOne({ where: field });
        if (isEmptyArray(equipment)) {
            return throwException('equipment not found');
        }
        return equipment;
    },

    getAll: async function () {
        const allEquipments = await EquipmentModel.findAll();
        if (isEmptyArray(allEquipments)) {
            return throwException('cannot find any equipment into the database', 204);
        }
        return allEquipments;
    },

    create: async function (equipment) {
        return await EquipmentModel.create(equipment)
            .then(equipment => {
                return equipment.id;
            })
            .catch(err => {
                return throwException('cannot create new equipment', 502);
            });
    },

    remove: async function (id) {
        const equipment = await EquipmentModel.findOne({
            where: { id: id }
        });
        const isEquipmentNull = !equipment;

        if (isEquipmentNull) {
            return throwException('equipment does not exist');
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