class ProvenanceData {
    constructor(visType, complexity){
        this.startTime = Date.now();
        this.visType = visType;
        this.complexity = complexity;
        this.provenance = [];
    }

    logEvent(eventData){
        let pd = this;
        eventData.time -= pd.startTime;
        eventData.visType = pd.visType;
        eventData.complexity = pd.complexity;
        pd.provenance.push(eventData);
    }

    getProvenance(){
        return this.provenance;
    }
}