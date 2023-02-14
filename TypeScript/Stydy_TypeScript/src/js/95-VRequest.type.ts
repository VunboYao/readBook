
import type { AxiosRequestConfig, InternalAxiosRequestConfig, AxiosResponse } from "axios"

export interface vInterceptor<T = AxiosResponse> {
	requestSuccess?: ((config: InternalAxiosRequestConfig) => InternalAxiosRequestConfig | Promise<InternalAxiosRequestConfig>) | null,
	requestFailed?: (error: any) => any | null
	responseSuccess?: ((response: T) => T | Promise<T>) | null,
	responseFailed?: (error: any) => any | null
}

export interface VRequestConfig<T = AxiosResponse> extends AxiosRequestConfig{
	interceptors?: vInterceptor<T>
}

