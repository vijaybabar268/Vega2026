import { ErrorHandler } from "@angular/core";

export class AppErrorHandler implements ErrorHandler {
    handleError(error: any): void {
        if (error.status == 401)
            alert("Error: Unathorized");
        else
            alert("Error: "+ error?.error);
    }

}