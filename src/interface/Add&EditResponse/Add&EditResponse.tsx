export interface AddProjectPayload{
    title:string,
    description:string
}

export interface AddTaskPayload{
    title:string,
    description:string,
    employeeId:number,
    projectId:number
}