import { utilService } from './util.service.js'

const delay = 700

export const storageService = {
    query,
    get,
    post,
    put,
    remove,
    postMany,
    queryWithDelay,
}

function queryWithDelay(entityType) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            resolve(query(entityType))
        }, delay)
    })
}

function query(entityType) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return Promise.resolve(entities)
}

function get(entityType, entityId) {
    return query(entityType).then(entities => entities.find(entity => entity._id === entityId))
}

function post(entityType, newEntity) {
    // newEntity._id = utilService.makeId()
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function postMany(entityType, newEntities) {
    return query(entityType).then(entities => {
        entities.push(...newEntities)
        _save(entityType, entities)
        return entities
    })
}

function put(entityType, updatedEntity) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === updatedEntity._id)
        entities.splice(idx, 1, updatedEntity)
        _save(entityType, entities)
        return updatedEntity
    })
}

function remove(entityType, entityId) {
    return query(entityType).then(entities => {
        const idx = entities.findIndex(entity => entity._id === entityId)
        const [removed] = entities.splice(idx, 1)
        _save(entityType, entities)
        return removed
    })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}
