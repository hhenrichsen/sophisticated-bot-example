import { Service } from 'typedi';
import Sentry from '@sentry/node';
import { Environment } from '../environment';

@Service()
export class SentryService {
    private hasDsn = false;
    constructor(environment: Environment) {
        const sentryDsn = environment.get('SENTRY_DSN');
        this.hasDsn = !!sentryDsn;
        if (this.hasDsn) {
            Sentry.init({
                dsn: sentryDsn,
            });
        }
    }

    public handleError(exception: unknown) {
        if (this.hasDsn) {
            Sentry.captureException(exception);
        }
    }
}
