"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Logger = void 0;
class Logger {
    static attack(casterClass, casterName, attackDamage, targetClass, targetName) {
        console.log(`(${casterClass}) ${casterName} deals ${attackDamage} damage to (${targetClass}) ${targetName}`);
    }
    static ability(casterClass, casterName, abilityName, abilityDamage, targetClass, targetName) {
        console.log(`(${casterClass}) ${casterName} is using (${abilityName}) dealing ${abilityDamage} damage to (${targetClass}) ${targetName}`);
    }
    static effectCast(casterClass, casterName, effectName, targetClass, targetName) {
        console.log(`(${casterClass}) ${casterName} applies (${effectName}) on (${targetClass}) ${targetName}`);
    }
    static effectTick(effectName, effectDamage, targetClass, targetName) {
        console.log(`(${effectName}) deals ${effectDamage} tick damage to (${targetClass}) ${targetName}`);
    }
    static resist(casterClass, casterName, abilityName, targetClass, targetName) {
        console.log(`(${casterClass}) ${casterName} is using (${abilityName}) on (${targetClass}) ${targetName} and deals no damage due to immunity`);
    }
}
exports.Logger = Logger;
//# sourceMappingURL=logger.js.map