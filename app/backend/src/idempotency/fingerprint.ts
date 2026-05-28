import crypto from 'crypto';

export class RequestFingerprint {
    private readonly hash: string;

    private constructor(hash: string) {
        this.hash = hash;
    }

    public static fromBody(body: Record<string, any>): RequestFingerprint {
        const sortedBody = RequestFingerprint.sortObjectKeys(body);
        const bodyString = JSON.stringify(sortedBody);
        const hash = crypto.createHash('sha256').update(bodyString).digest('hex');
        return new RequestFingerprint(hash);
    }

    public asString(): string {
        return this.hash;
    }

    private static sortObjectKeys(obj: any): any {
        if (Array.isArray(obj)) {
            return obj.map(RequestFingerprint.sortObjectKeys);
        }
        if (obj !== null && typeof obj === 'object') {
            return Object.keys(obj)
              .sort()
              .reduce((result: Record<string, any>, key: string) => {
                  result[key] = RequestFingerprint.sortObjectKeys(obj[key]);
                  return result;
              }, {});
        }
        return obj;
    }
}