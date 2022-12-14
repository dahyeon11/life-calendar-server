import { Module, Global } from '@nestjs/common';
import { BootstrapService } from './bootstrap.service';
import { DatabaseService } from './database.service';
import { GlobalService } from './global.service';
import { JWTService } from "./jwt.service";
import * as jose from "jose"
import * as fs from 'fs'
import * as path from 'path'


@Global()
@Module({
  imports: [],
  providers: [GlobalService, ...DatabaseService, BootstrapService, JWTService,
    {
        provide: 'EC384Keypair',
        useFactory: async () => {
            let privateKey
            let publicKey
            try {
                privateKey = fs.readFileSync(path.join(__dirname,'../../../../certs', 'pkcs_ec_p384_private.pem') ).toString()
                publicKey = fs.readFileSync(path.join(__dirname,'../../../../certs', 'ec_p384_public.pem') ).toString()
            } catch (error) {
                console.log(error)
                // X-Ray
            }
            const algorithm = 'ES384'
            const josePrivateKey = await jose.importPKCS8(privateKey, algorithm)
            const josePublicKey = await jose.importSPKI(publicKey, algorithm)

            return { josePrivateKey, josePublicKey }
        }
    }],
  exports: [GlobalService, ...DatabaseService, JWTService, 'EC384Keypair'],
})
export class GlobalModule {}