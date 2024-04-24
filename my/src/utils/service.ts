import {instance} from "./api";

class Service {


    async getProjects() {
        return instance.get<{projects: ProjectDto[]}>(`/project/get`)
    }

    async getProjectFiles(projectId: string) {
        return instance.get<{files: ProjectFileDto[]}>(`/project/${projectId}/file/get`)
    }

    async uploadTestFile(data: UploadTestFileDto) {

        const formData = new FormData();
        formData.append("projectID", data.projectID);
        formData.append("file", data.file);

        return instance.post(`/project/testUpload`, formData)
    }
    async login(data: LoginCredentials) {
        return instance.post<TokensResponse>(`/user/login`, data)
    }

    async refreshToken(refreshToken: string | null) {
        return instance.post<TokensResponse>(`/user/refresh`, {refreshToken})
    }

}

export const service = new Service();

export const queryKeys = {
    projects: () => ["GET_PROJECTS"],
    projectFiles: (projectId?: string) => ["GET_PROJECT_FILES", projectId],
    refreshToken: () => ["REFRESH_TOKEN"],
}

export type LoginCredentials = {
    email: string,
    password: string
}

export type TokensResponse = {
    token: string,
    refreshToken: string
}

export type UploadTestFileDto = {
    projectID: string,
    file: File
}

export type ProjectFileDto = {
    name: string,
    path: string,
    type: string
}

export type ProjectDto = {
    createdAt: string,
    id: string,
    name: string,
    updatedAt: string
}