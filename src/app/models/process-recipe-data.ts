export class RecipeRunResult {
    constructor() {
        this.documents = new Array<ProcessedDocument>();
        this.detailActivities = new Array<ProcessedActivity>();
    }

    processId: string;
    documents: ProcessedDocument[];
    detailActivities: ProcessedActivity[];
}

export class ProcessedDocument {
    constructor() {
        this.activities = new Array<ProcessedActivity>();
    }

    id: string;
    status: string;
    activities: ProcessedActivity[];
}

export class ProcessedActivity {
    constructor() {
        this.logs = new Array<ActivityLog>();
        this.sourceDatas = new Array<ActivitySourceData>();
        this.connectionDatas = new Array<ActivityConnectionData>();
    }

    id: string;
    name: string;
    documentId: string;
    logs: ActivityLog[];
    sourceDatas: ActivitySourceData[];
    connectionDatas: ActivityConnectionData[];
    status: string;
}

export class ActivityLog {
    level: string;
    shape: string;
    extInfo: string;
    message: string;
    detail: string;
    time: string;
    index: number
}

export class ActivityData {
    /**
     * Creates an instance of ActivityData.
     * @param {*} dataType
     * @memberof ActivityData
     */
    constructor(private _dataType: string) { }
    directory: string;
    fileName: string;
    size: number;

    get dataType(): string { return this._dataType; }
}

export class ActivitySourceData extends ActivityData {
    constructor() {
        super('SOURCE_DATA');
    }
}

export class ActivityConnectionData extends ActivityData {
    constructor() {
        super('CONNECTION_DATA');
    }
}

export interface SelectionActivityChangedInfo {
    id: string
}

export interface ActivityStatusChangedInfo {
    id: string,
    status: string
}

export function mapToRecipeRunResult(result: any): RecipeRunResult {
    if (!result) {
        return null;
    }

    let data = new RecipeRunResult();
    data.processId = result.processId;

    if (result.documents && result.documents.length > 0) {
        result.documents.forEach(documentItem => {
            let document: ProcessedDocument = new ProcessedDocument();
            document.id = documentItem.id;
            document.status = documentItem.status;
            data.documents.push(document);

            if (documentItem.activities) {
                documentItem.activities.forEach(activityItem => {
                    let activity = new ProcessedActivity();
                    activity.id = activityItem.activity_id;
                    activity.name = activityItem.activity_name;
                    activity.documentId = activityItem.document_id;
                    activity.status = activityItem.status;
                    document.activities.push(activity);

                    if (activityItem.logs) {
                        let activityLogs = JSON.parse(activityItem.logs);
                        activityLogs.forEach(logItem => {
                            let log = new ActivityLog();
                            log.level = logItem.level;
                            log.shape = logItem.shape;
                            log.extInfo = logItem.extInfo;
                            log.message = logItem.message;
                            log.detail = logItem.detail;
                            log.time = logItem.time;
                            log.index = logItem.log_index;
                            activity.logs.push(log);
                        });
                    }

                    if (activityItem.source_data) {
                        let activitySourceData = JSON.parse(activityItem.source_data);
                        activitySourceData.forEach(sourceDataItem => {
                            let sourceData = new ActivitySourceData();
                            sourceData.directory = sourceDataItem.directory;
                            sourceData.fileName = sourceDataItem.fileName;
                            sourceData.size = sourceDataItem.size;
                            activity.sourceDatas.push(sourceData);
                        });
                    }

                    if (activityItem.connection_data) {
                        let activityConnectionData = JSON.parse(activityItem.connection_data);
                        activityConnectionData.forEach(connectionDataItem => {
                            let connectionData = new ActivityConnectionData();
                            connectionData.directory = connectionDataItem.directory;
                            connectionData.fileName = connectionDataItem.fileName;
                            connectionData.size = connectionDataItem.size;
                            activity.connectionDatas.push(connectionData);
                        });
                    }
                });
            }
        });
    }

    if (result.recipeLogs && result.recipeLogs.length > 0) {
        result.recipeLogs.forEach(activityItem => {
            let activity = new ProcessedActivity();
            activity.id = activityItem.activity_id;
            activity.name = activityItem.activity_name;
            activity.documentId = activityItem.document_id;
            activity.status = activityItem.status;
            data.detailActivities.push(activity);

            if (activityItem.logs) {
                let activityLogs = JSON.parse(activityItem.logs);
                activityLogs.forEach(logItem => {
                    let log = new ActivityLog();
                    log.level = logItem.level;
                    log.shape = logItem.shape;
                    log.extInfo = logItem.extInfo;
                    log.message = logItem.message;
                    log.detail = logItem.detail;
                    log.time = logItem.time;
                    log.index = logItem.log_index;
                    activity.logs.push(log);
                });
            }

            if (activityItem.source_data) {
                let activitySourceData = JSON.parse(activityItem.source_data);
                activitySourceData.forEach(sourceDataItem => {
                    let sourceData = new ActivitySourceData();
                    sourceData.directory = sourceDataItem.directory;
                    sourceData.fileName = sourceDataItem.fileName;
                    sourceData.size = sourceDataItem.size;
                    activity.sourceDatas.push(sourceData);
                });
            }

            if (activityItem.connection_data) {
                let activityConnectionData = JSON.parse(activityItem.connection_data);
                activityConnectionData.forEach(connectionDataItem => {
                    let connectionData = new ActivityConnectionData();
                    connectionData.directory = connectionDataItem.directory;
                    connectionData.fileName = connectionDataItem.fileName;
                    connectionData.size = connectionDataItem.size;
                    activity.connectionDatas.push(connectionData);
                });
            }
        });
    }

    return data;
}