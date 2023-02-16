class ProvenanceData {
    constructor(visType, complexity){
        this.startTime = Date.now();
        this.visType = visType;
        this.complexity = complexity;
        this.provenance = [];
    }

    logEvent(eventData){
        eventData.time -= this.startTime;
        eventData.visType = this.visType;
        eventData.complexity = this.complexity;
        this.provenance.push(eventData);
    }

    getProvenance(){
        return {
            startTime: this.startTime,
            visType: this.visType,
            complexity: this.complexity,
            provenance: this.provenance
        };
    }
}