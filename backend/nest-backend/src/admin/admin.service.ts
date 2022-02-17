import { Inject, Injectable } from '@nestjs/common';
import { AdminDto } from './dto/admin.dto';
import { ADMIN_REPOSITORY } from '../constant';
import { Admin} from './admin.entity';

@Injectable()
export class AdminService {

    constructor(@Inject(ADMIN_REPOSITORY) private readonly adminRepository: typeof Admin) { }

    async create(admin: AdminDto): Promise<Admin> {
        return await this.adminRepository.create<Admin>(admin);
    }
    async findOneByEmail(email: string): Promise<Admin> {
        return await this.adminRepository.findOne<Admin>({ where: { email } });
    }

    async findOneById(id: number): Promise<Admin> {
        return await this.adminRepository.findOne<Admin>({ where: { id } });
    }
}
