import {recognizeFromFileUrl} from "../src/worker";

test('random string as file url', async () => {
    expect(await recognizeFromFileUrl('aaa')).toBe(undefined);
});

test('url of file containing text', async () => {
    expect(await recognizeFromFileUrl('https://previews.123rf.com/images/happyroman/happyroman1611/happyroman161100004/67968361-atm-transaction-printed-paper-receipt-bill-vector.jpg'))
        .toContain('ATM TRANSACTION\n' +
            '\n' +
            'TERMINAL # 65425899\n' +
            'SEQUNCE # 8564\n' +
            'DATE 15:18 08/10/2016\n' +
            '\n' +
            'CARD NUMBER XXXXXXXXXXXX5698\n' +
            '\n' +
            'CUSTOMER NAME JOHN EMPTY\n' +
            'REQUSTED AMOUNT $100.00\n' +
            'TERMINAL FEE Sik25\n' +
            '\n' +
            'TOTAL AMOUNT $101.25')
});

test('url of file with no text', async () => {
    expect((await recognizeFromFileUrl('https://media.istockphoto.com/photos/feline-picture-id108226626?k=20&m=108226626&s=612x612&w=0&h=bDaWwxhcygjerdR71qQu8YFSXaDUIi_HUZV2AADg5L8='))
        .replaceAll("\n", '')
        .replaceAll(" ", ''))
        .toBe('');
});