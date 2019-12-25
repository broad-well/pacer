const Task = require('./task.js').Task
import test from 'ava'

const task = new Task('apush notes', new Date(2019, 8, 20), new Date(2019, 9, 17), 40, 'pages')

test('instantiate Task', t => {
    t.is(task.name, 'apush notes')
    t.deepEqual(task.startDate, new Date(2019, 8, 20))
    t.deepEqual(task.endDate, new Date(2019, 9, 17))
    t.is(task.numWorkUnits, 40)
    t.deepEqual(task.workUnit, 'pages')
})

test('0 units done at start date', t => {
    t.is(task.expectedUnitsDone(task.startDate), 0)
})

test('all units done at end date', t => {
    t.is(task.expectedUnitsDone(task.endDate), task.numWorkUnits)
})

test('half units done at halfway', t => {
    const halfway = (task.endDate.getTime() + task.startDate.getTime()) / 2
    const date = new Date(halfway)
    t.is(task.expectedUnitsDone(date), task.numWorkUnits / 2)
})

test('0 units done before start date', t => {
    const before = new Date(1999, 9, 9)
    t.is(task.expectedUnitsDone(before), 0)
})

test('all units done after start date', t => {
    const after = new Date(2030, 5, 4)
    t.is(task.expectedUnitsDone(after), task.numWorkUnits)
})

test('toObject() returns correct info', t => {
    const task = new Task('ap calculus bc', new Date(2019, 8, 10), new Date(2020, 4, 1), 50000, 'mastery points')
    const object = task.toObject()
    t.deepEqual(object, {
        name: 'ap calculus bc',
        startDate: task.startDate.toJSON(),
        endDate: task.endDate.toJSON(),
        numWorkUnits: 50000,
        workUnit: 'mastery points'
    })
})

test('fromObject() constructs correct Task', t => {
    const object = {
        name: 'ap physics c',
        startDate: new Date(2019, 8, 20).toJSON(),
        endDate: new Date(2020, 4, 10).toJSON(),
        numWorkUnits: 50,
        workUnit: 'lessons'
    }
    const task = Task.fromObject(object)
    
    t.is(task.name, object.name)
    t.deepEqual(task.startDate, new Date(2019, 8, 20))
    t.deepEqual(task.endDate, new Date(2020, 4, 10))
    t.is(task.numWorkUnits, object.numWorkUnits)
    t.is(task.workUnit, object.workUnit)
})