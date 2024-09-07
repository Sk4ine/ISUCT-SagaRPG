abstract class Logger {
    public static attack(casterClass: string, casterName: string, attackDamage: number, targetClass: string, targetName: string): void {
        console.log(`(${casterClass}) ${casterName} deals ${attackDamage} damage to (${targetClass}) ${targetName}`);
    }

    public static ability(casterClass: string, casterName: string, abilityName: string, abilityDamage: number, targetClass: string, targetName: string): void {
        console.log(`(${casterClass}) ${casterName} is using (${abilityName}) dealing ${abilityDamage} damage to (${targetClass}) ${targetName}`);
    }

    public static effectCast(casterClass: string, casterName: string, effectName: string, targetClass: string, targetName: string): void {
        console.log(`(${casterClass}) ${casterName} applies (${effectName}) on (${targetClass}) ${targetName}`);
    }

    public static effectTick(effectName: string, effectDamage: number, targetClass: string, targetName: string): void {
        console.log(`(${effectName}) deals ${effectDamage} tick damage to (${targetClass}) ${targetName}`)
    }

    public static resist(casterClass: string, casterName: string, abilityName: string, targetClass: string, targetName: string): void {
        console.log(`(${casterClass}) ${casterName} is using (${abilityName}) on (${targetClass}) ${targetName} and deals no damage due to immunity`);
    }
}

export {Logger};