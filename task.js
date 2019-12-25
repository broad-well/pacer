class Task {
    static fromObject(object) {
        return new Task(object.name, new Date(object.startDate), new Date(object.endDate), object.numWorkUnits, object.workUnit)
    }

    constructor(name, startDate, endDate, numWorkUnits, workUnit) {
        this.name = name
        this.startDate = startDate
        this.endDate = endDate
        this.numWorkUnits = numWorkUnits
        this.workUnit = workUnit
    }

    expectedUnitsDone(date) {
        if (date.getTime() < this.startDate.getTime()) return 0
        if (date.getTime() > this.endDate.getTime()) return this.numWorkUnits

        const ratio = (date.getTime() - this.startDate.getTime()) / (this.endDate.getTime() - this.startDate.getTime())
        return Math.round(ratio * this.numWorkUnits)
    }

    toObject() {
        return {
            name: this.name,
            startDate: this.startDate.toJSON(),
            endDate: this.endDate.toJSON(),
            numWorkUnits: this.numWorkUnits,
            workUnit: this.workUnit
        }
    }
}

if (typeof window === 'undefined') exports.Task = Task