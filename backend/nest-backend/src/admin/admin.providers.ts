import { Admin } from './admin.entity';
import { ADMIN_REPOSITORY } from '../constant';

export const adminProviders = [{
    provide: ADMIN_REPOSITORY,
    useValue: Admin,
}];